## Features

### User

- [ ] It should be able to create a user;
- [ ] It should be able to get a user;
- [ ] It should be able to update a user;
- [ ] It should be able to delete a user;
- [ ] It should be able to get a list of users;

### Authentication

- [ ] It should be able to authenticate using email & password;

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

| Método  | Rota                                                   | Descrição                                    |
|---------|--------------------------------------------------------|----------------------------------------------|
| POST    | /auth/register                                         | Cria um usuário                              |
| POST    | /auth/login                                            | Faz login de um usuário                      |
| GET     | /user                                                  | Retorna o usuário autenticado                |
| GET     | /guilds                                                | Retorna todos os servidores disponíveis      |
| POST    | /guilds                                                | Cria um novo servidor                        |
| DELETE  | /guilds/{guildId}                                      | Deleta um servidor                           |
| GET     | /guilds/{guildId}                                      | Lista as salas de um servidor                |
| POST    | /guilds/{guildId}/channels                             | Cria um novo canal dentro de um servidor     |
| GET     | /guilds/{guildId}/channels/{channelId}                 | Entra em um canal e começa a escutar as mensagens |
| POST    | /guilds/{guildId}/channels/{channelId}/messages        | Envia uma mensagem para um canal específico  |
| DELETE  | /guilds/{guildId}/channels/{channelId}/messages/{messageId} | Deleta uma mensagem em um canal específico   |
