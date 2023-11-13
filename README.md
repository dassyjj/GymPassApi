# App

GymPass style app.

## RFs (Functional Requirements)

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It should be possible to get the profile of a logged-in user;
- [x] It should be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It should be possible for the user to obtain their check-in history;
- [x] It should be possible for the user to search for nearby gyms;
- [x] It should be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in to a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register an academy;

## RNs (Business Rules)

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot do 2 check-ins on the same day;
- [x] The user cannot check-in if they are not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [x] The user's password must be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);