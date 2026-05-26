# 📋 Test Cases - Pet Bath Scheduler API

**Project:** Pet Bath Scheduler  
**QA Engineer:** Priscila Marques  
**Date:** 26/05/2026  
**Version:** 1.0  

---

## Endpoint: GET /api/appointments

### TC-001 - List all appointments successfully

| Field | Description |
|-------|-------------|
| **ID** | TC-001 |
| **Title** | List all registered appointments |
| **Endpoint** | GET /api/appointments |
| **Precondition** | Server must be running at `http://localhost:3000` |
| **Priority** | High |

**Steps:**
1. Open Postman or Thunder Client
2. Select **GET** method
3. Enter URL `http://localhost:3000/api/appointments`
4. Click **Send**

**Expected Result:**
- Status Code: **200 OK** ✅
- Response body must be an Array `[]`
- Response time under **1000ms**

---

### TC-002 - Validate mandatory fields in response

| Field | Description |
|-------|-------------|
| **ID** | TC-002 |
| **Title** | Validate all required fields are returned |
| **Endpoint** | GET /api/appointments |
| **Precondition** | At least 1 appointment must exist |
| **Priority** | High |

**Steps:**
1. Execute TC-001
2. Observe the Response Body

**Expected Result:**
All fields below must be present and not null:

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Unique identifier |
| `owner` | String | Owner's name |
| `phone` | String | Owner's phone number |
| `pet` | String | Pet's name |
| `breed` | String | Pet's breed |
| `weight` | String | Pet's weight |
| `date` | String | Appointment date |
| `time` | String | Appointment time |
| `service` | String | Service type |

> ⚠️ **Business Rule:** All fields above are **mandatory**. No appointment should be created with missing fields.

---

## Endpoint: POST /api/appointments

### TC-003 - Create appointment with valid data (Positive Scenario)

| Field | Description |
|-------|-------------|
| **ID** | TC-003 |
| **Title** | Create a new appointment successfully |
| **Endpoint** | POST /api/appointments |
| **Precondition** | Server must be running |
| **Priority** | High |

**Steps:**
1. Open Postman or Thunder Client
2. Select **POST** method
3. Enter URL `http://localhost:3000/api/appointments`
4. Go to **Body** tab and select **JSON**
5. Enter the following payload:
```json
{
  "owner": "Priscila",
  "phone": "91234-5678",
  "pet": "Bolinha",
  "breed": "Pug",
  "weight": "8",
  "date": "2026-05-30",
  "time": "14:00",
  "service": "Bath"
}
```
6. Click **Send**

**Expected Result:**
- Status Code: **201 Created** ✅
- Response body must contain the submitted data
- Field `id` must be auto-generated and not null

---

### TC-004 - Create appointment with invalid data (Negative Scenario)

| Field | Description |
|-------|-------------|
| **ID** | TC-004 |
| **Title** | Attempt to create an appointment with invalid data |
| **Endpoint** | POST /api/appointments |
| **Precondition** | Server must be running |
| **Priority** | Medium |

**Steps:**
1. Select **POST** method
2. Enter URL `http://localhost:3000/api/appointments`
3. Go to **Body** tab and enter invalid content:
```
invalid text without json format
```
4. Click **Send**

**Expected Result:**
- Status Code: **400 Bad Request** ✅
- Response must contain an error message
- API must **NOT** return 500 (internal server error)

---

### TC-005 - Verify data persistence after creation

| Field | Description |
|-------|-------------|
| **ID** | TC-005 |
| **Title** | Verify created appointment appears in listing |
| **Endpoint** | POST + GET /api/appointments |
| **Precondition** | TC-003 must have been executed successfully |
| **Priority** | High |

**Steps:**
1. Execute TC-003 (create "Bolinha" appointment)
2. Change method to **GET**
3. Click **Send**

**Expected Result:**
- The appointment created in TC-003 must appear in the list
- All data (name, breed, date) must be correct

---

## Test Summary

| ID | Title | Method | Priority | Status |
|----|-------|--------|----------|--------|
| TC-001 | List appointments successfully | GET | High | ✅ Passed |
| TC-002 | Validate mandatory fields | GET | High | ✅ Passed |
| TC-003 | Create valid appointment | POST | High | ✅ Passed |
| TC-004 | Create invalid appointment | POST | Medium | ✅ Passed |
| TC-005 | Verify data persistence | POST + GET | High | ✅ Passed |
