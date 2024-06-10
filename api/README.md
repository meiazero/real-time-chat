## Features

### Authentication

- [ ] It should be able to create a account
- [ ] It should be able to authenticate using email & password;
- [ ] It should be able to authenticate using token;
- [ ] It should be able to get a user;
- [ ] It should be able to update a user;
- [ ] It should be able to delete a user;

### Guild

- [ ] It should be able to create a guild;
- [ ] It should be able to get a guild;
- [ ] It should be able to update a guild;
- [ ] It should be able to delete a guild;
- [ ] It should be able to get a list of guilds;

### Text Channel

- [ ] It should be able to create a text channel;
- [ ] It should be able to get a text channel;
- [ ] It should be able to update a text channel;
- [ ] It should be able to delete a text channel;
- [ ] It should be able to get a list of text channels;


## Requirements

**User:**
- name
- username
- email
- password
- avatar
- guilds
- messages sent

**Guild:**
- name
- description
- owner
- members
- channels

**Text Channel:**
- name
- description
- guild
- messages sent

**Message:**
- content
- author
- channel
- timestamp

### Application endpoints

> [!NOTE]
> To see the documentation of the API, you can run the api with `bun dev` and then open [http://localhost:3333/](http://localhost:3333/).