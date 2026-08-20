package com.crisisgrid.controller;

import com.crisisgrid.entity.EmergencyStatus;
import com.crisisgrid.entity.EmergencyType;
import com.crisisgrid.entity.RequiredResource;
import com.crisisgrid.entity.Severity;
import com.crisisgrid.repository.EmergencyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EmergencyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EmergencyRepository emergencyRepository;

    @BeforeEach
    void setUp() {
        emergencyRepository.deleteAll();
    }

    @Test
    @DisplayName("POST /api/emergencies creates emergency and calculates priority, status, timestamps")
    void testCreateEmergency() throws Exception {
        String requestJson = """
                {
                  "title": "Flooding in Velachery",
                  "description": "Several residents are stranded and require immediate assistance.",
                  "emergencyType": "FLOOD",
                  "severity": "HIGH",
                  "latitude": 12.9815,
                  "longitude": 80.2180,
                  "peopleAffected": 35,
                  "medicalRequired": true,
                  "requiredResource": "RESCUE_TEAM"
                }
                """;

        mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.title", is("Flooding in Velachery")))
                .andExpect(jsonPath("$.description", is("Several residents are stranded and require immediate assistance.")))
                .andExpect(jsonPath("$.emergencyType", is("FLOOD")))
                .andExpect(jsonPath("$.severity", is("HIGH")))
                .andExpect(jsonPath("$.latitude", is(12.9815)))
                .andExpect(jsonPath("$.longitude", is(80.2180)))
                .andExpect(jsonPath("$.peopleAffected", is(35)))
                .andExpect(jsonPath("$.medicalRequired", is(true)))
                .andExpect(jsonPath("$.requiredResource", is("RESCUE_TEAM")))
                .andExpect(jsonPath("$.status", is("REPORTED")))
                .andExpect(jsonPath("$.priorityScore", greaterThan(0)))
                .andExpect(jsonPath("$.reportedAt", notNullValue()))
                .andExpect(jsonPath("$.updatedAt", notNullValue()));
    }

    @Test
    @DisplayName("GET /api/emergencies returns list of emergencies")
    void testGetAllEmergencies() throws Exception {
        String requestJson = """
                {
                  "title": "Fire in T. Nagar",
                  "description": "Commercial building fire reported on 2nd floor.",
                  "emergencyType": "FIRE",
                  "severity": "CRITICAL",
                  "latitude": 13.0418,
                  "longitude": 80.2341,
                  "peopleAffected": 15,
                  "medicalRequired": true,
                  "requiredResource": "FIRE_TRUCK"
                }
                """;

        mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/emergencies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Fire in T. Nagar")));
    }

    @Test
    @DisplayName("GET /api/emergencies/{id} returns emergency by id")
    void testGetEmergencyById() throws Exception {
        String requestJson = """
                {
                  "title": "Medical Emergency in Adyar",
                  "description": "Cardiac arrest reported at community center.",
                  "emergencyType": "MEDICAL",
                  "severity": "HIGH",
                  "latitude": 13.0012,
                  "longitude": 80.2565,
                  "peopleAffected": 1,
                  "medicalRequired": true,
                  "requiredResource": "AMBULANCE"
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        org.json.JSONObject jsonObject = new org.json.JSONObject(responseContent);
        long id = jsonObject.getLong("id");

        mockMvc.perform(get("/api/emergencies/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) id)))
                .andExpect(jsonPath("$.title", is("Medical Emergency in Adyar")));
    }

    @Test
    @DisplayName("PUT /api/emergencies/{id} updates emergency details and recalculates priority")
    void testUpdateEmergency() throws Exception {
        String createJson = """
                {
                  "title": "Road Accident",
                  "description": "Two vehicle collision.",
                  "emergencyType": "ACCIDENT",
                  "severity": "LOW",
                  "latitude": 12.9815,
                  "longitude": 80.2180,
                  "peopleAffected": 2,
                  "medicalRequired": false,
                  "requiredResource": "AMBULANCE"
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createJson))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        org.json.JSONObject jsonObject = new org.json.JSONObject(responseContent);
        long id = jsonObject.getLong("id");
        int initialScore = jsonObject.getInt("priorityScore");

        String updateJson = """
                {
                  "title": "Major Highway Collision",
                  "description": "Multi-vehicle collision with severe casualties.",
                  "emergencyType": "ACCIDENT",
                  "severity": "CRITICAL",
                  "latitude": 12.9815,
                  "longitude": 80.2180,
                  "peopleAffected": 40,
                  "medicalRequired": true,
                  "requiredResource": "MEDICAL_TEAM"
                }
                """;

        mockMvc.perform(put("/api/emergencies/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) id)))
                .andExpect(jsonPath("$.title", is("Major Highway Collision")))
                .andExpect(jsonPath("$.severity", is("CRITICAL")))
                .andExpect(jsonPath("$.priorityScore", greaterThan(initialScore)));
    }

    @Test
    @DisplayName("PATCH /api/emergencies/{id}/status updates emergency status")
    void testUpdateEmergencyStatus() throws Exception {
        String createJson = """
                {
                  "title": "Flooding in Velachery",
                  "description": "Several residents are stranded and require immediate assistance.",
                  "emergencyType": "FLOOD",
                  "severity": "HIGH",
                  "latitude": 12.9815,
                  "longitude": 80.2180,
                  "peopleAffected": 35,
                  "medicalRequired": true,
                  "requiredResource": "RESCUE_TEAM"
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createJson))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        org.json.JSONObject jsonObject = new org.json.JSONObject(responseContent);
        long id = jsonObject.getLong("id");

        String statusUpdateJson = """
                {
                  "status": "VERIFIED"
                }
                """;

        mockMvc.perform(patch("/api/emergencies/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(statusUpdateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) id)))
                .andExpect(jsonPath("$.status", is("VERIFIED")));
    }

    @Test
    @DisplayName("DELETE /api/emergencies/{id} returns 204 and removes emergency")
    void testDeleteEmergency() throws Exception {
        String createJson = """
                {
                  "title": "Minor incident",
                  "description": "Tree branch fallen.",
                  "emergencyType": "OTHER",
                  "severity": "LOW",
                  "latitude": 12.9815,
                  "longitude": 80.2180,
                  "peopleAffected": 0,
                  "medicalRequired": false,
                  "requiredResource": "OTHER"
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createJson))
                .andExpect(status().isCreated())
                .andReturn();

        String responseContent = result.getResponse().getContentAsString();
        org.json.JSONObject jsonObject = new org.json.JSONObject(responseContent);
        long id = jsonObject.getLong("id");

        mockMvc.perform(delete("/api/emergencies/" + id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/emergencies/" + id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")));
    }

    @Test
    @DisplayName("POST /api/emergencies with invalid fields returns 400 Bad Request")
    void testValidationFailure() throws Exception {
        String invalidJson = """
                {
                  "title": "",
                  "description": "",
                  "emergencyType": null,
                  "severity": null,
                  "latitude": 150.0,
                  "longitude": -200.0,
                  "peopleAffected": -5,
                  "medicalRequired": null,
                  "requiredResource": null
                }
                """;

        mockMvc.perform(post("/api/emergencies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.error", is("Validation Error")))
                .andExpect(jsonPath("$.validationErrors", notNullValue()));
    }
}
