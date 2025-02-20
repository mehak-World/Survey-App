package com.backend.form_app.controllers;

import com.backend.form_app.dtos.FormDto;
import com.backend.form_app.dtos.submission.SubmissionDto;
import com.backend.form_app.dtos.submission.SubmissionResultDto;
import com.backend.form_app.entities.Form;
import com.backend.form_app.repositories.FormRepository;
import com.backend.form_app.services.AuthorizationService;
import com.backend.form_app.services.FormService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final FormRepository formRepository;
    private final FormService formService;
    private final AuthorizationService authorizationService;

    @GetMapping(value = {"/forms/{id}"})
    public ResponseEntity<Form> getFormById(@PathVariable String id) {

        Optional<Form> form = formRepository.findById(id);

        if (form.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Form retrieved = form.get();

        log.info("Form data: " + retrieved);

        return ResponseEntity.ok().body(retrieved);
    }

    @GetMapping("/get_submissions/{formId}")
    public ResponseEntity<?> getSubmissions(@PathVariable ObjectId formId) {
        if (!authorizationService.checkFormBelongsToUser(formId)) {
            return ResponseEntity.status(403).body("Form does not belong to user");
        }

        List<SubmissionResultDto> submissionResults = formService.getSubmissionResults(formId);

        return ResponseEntity.ok().body(submissionResults);
    }

    @GetMapping("/getuserforms")
    public ResponseEntity<List<Form>> getUserForms() {
        return ResponseEntity.ok().body(formService.getUserForms());
    }

    @PostMapping("/createform")
    public ResponseEntity<String> createForm(@RequestBody FormDto formDto) {

        //log.info("Id: " + id);
        log.info("Form data: " + formDto.toString());
        log.info("Question data: " + formDto.questions().toString());

        try {
            formService.createForm(formDto);
        } catch (Exception e) {
            log.error("Form creation failed: " + Arrays.toString(e.getStackTrace()));
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Form creation failed");
        }

        return ResponseEntity.ok().body("Form created");
    }

    @PatchMapping("/updateform/{formId}")
    public ResponseEntity<?> updateForm(@PathVariable ObjectId formId,
                                        @RequestBody FormDto formDto) {
        if (!authorizationService.checkFormBelongsToUser(formId))
            return ResponseEntity.status(403).body("Form does not belong to user");

        try {
            formService.updateForm(formId, formDto);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error in saving form");
        }

        return ResponseEntity.ok().body("Form saved");
    }

    @PostMapping("/response")
    public ResponseEntity<String> submitResponse(@RequestBody SubmissionDto submissionDto) {

        formService.processSubmission(submissionDto);

        return ResponseEntity.ok().body("Submitted");
    }

    @DeleteMapping("/deleteform/{formId}")
    public ResponseEntity<?> deleteForm(@PathVariable ObjectId formId) {
        if (!authorizationService.checkFormBelongsToUser(formId)) {
            return ResponseEntity.status(403).body("Form does not belong to user");
        }
        formService.deleteForm(formId);

        return ResponseEntity.ok().body("Form deleted");
    }

    /*
    @Value("${cloudinaryKey}")
    private String secretKey;

    @PostMapping("/upload_image")
    public ResponseEntity<?> uploadImage(@RequestPart MultipartFile file) throws IOException {

        log.info("File name: " + file.getName());
        try {
            log.info("File bytes: " + file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String timestamp = Instant.now().truncatedTo(ChronoUnit.SECONDS).toString();
        String public_id = "user/form-images";

        String signitureString = "public_id=" + public_id + "&timestamp=" + timestamp + secretKey;

        //String signitureString1 = "eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=sample_image&timestamp=1315060510abcd";

        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        byte[] hash = digest.digest(signitureString.getBytes(StandardCharsets.UTF_8));

        final StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            final String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1)
                hexString.append('0');
            hexString.append(hex);
        }

        log.info("Hash: " + hexString);

        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httppost = new HttpPost("https://api.cloudinary.com/v1_1/forms-app/image/upload");

        HttpEntity entity = MultipartEntityBuilder.create()
                .addPart("file", new ByteArrayBody(file.getBytes(), ContentType.parse(file.getContentType()), file.getName()))
                .addPart("api_key", new StringBody("646341365341642", ContentType.DEFAULT_TEXT))
                .addPart("timestamp", new StringBody(timestamp, ContentType.DEFAULT_TEXT))
                .addPart("public_id", new StringBody(public_id, ContentType.DEFAULT_TEXT))
                .addPart("signature", new StringBody(hexString.toString(), ContentType.DEFAULT_TEXT))
                .build();

        httppost.setEntity(entity);

        CloseableHttpResponse response = httpclient.execute(httppost);

        try {
            HttpEntity responseEntity = response.getEntity();

            if (entity != null) {
                String responseString = EntityUtils.toString(responseEntity, "UTF-8");
                System.out.println(responseString);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            httpclient.close();
            response.close();

        }

        return ResponseEntity.ok().body(null);
    }

     */
}
