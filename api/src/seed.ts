import { newId } from "@/utils/new-id";
import bcrypt from "bcryptjs";
import { sql } from "./lib/postgres";

async function seed() {
  const now = new Date().toISOString();

  await sql
    .begin(async (sql) => {
      // Inserir usuários
      const user1Id = newId("user");
      const user2Id = newId("user");
      const user3Id = newId("user");

      // Apagar conteúdos das tabelas
      await sql`DELETE FROM guild_members`;
      await sql`DELETE FROM messages`;
      await sql`DELETE FROM text_channels`;
      await sql`DELETE FROM guilds`;
      await sql`DELETE FROM users`;

      await sql`
        INSERT INTO users (id, name, email, username, avatar, password, created_at, updated_at) VALUES
        (${user1Id}, 'John Doe', 'john@doe.com', 'johndoe', 'https://api.dicebear.com/8.x/identicon/svg?seed=johndoe', ${await bcrypt.hash(
        "password",
        10
      )}, ${now}, ${now}),
        (${user2Id}, 'Jane Doe', 'jane@doe.com', 'janedoe', 'https://api.dicebear.com/8.x/identicon/svg?seed=janedoe', ${await bcrypt.hash(
        "password",
        10
      )}, ${now}, ${now}),
        (${user3Id}, 'Bob Smith', 'bob@smith.com', 'bobsmith', 'https://api.dicebear.com/8.x/identicon/svg?seed=bobsmith', ${await bcrypt.hash(
        "password",
        10
      )}, ${now}, ${now})
      `;

      // Inserir guilds
      const guildId = newId("guild");

      await sql`
        INSERT INTO guilds (id, name, description, owner, created_at, updated_at) VALUES
        (${guildId}, 'Guild 1', 'Description of Guild 1', ${user1Id}, ${now}, ${now})
      `;

      // Inserir canais de texto
      const textChannelId = newId("text_channel");

      await sql`
        INSERT INTO text_channels (id, guild_id, name, description, created_at, updated_at) VALUES
        (${textChannelId}, ${guildId}, 'Text Channel 1', 'Description of Text Channel 1', ${now}, ${now})
      `;

      // Inserir mensagens
      await sql`
        INSERT INTO messages (id, content, author, channel, created_at, updated_at) VALUES
        (${newId(
          "message"
        )}, 'What is the best way to learn JavaScript?', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'I recommend starting with online tutorials and practicing by building small projects.', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Does anyone have experience with using TypeScript in a large project?', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Yes, we have been using TypeScript for over a year now and it has significantly improved our code quality.', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Can someone explain the differences between React and Vue.js?', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'React is a library for building user interfaces, whereas Vue.js is a progressive framework. Both have their pros and cons depending on the project requirements.', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'What are some good practices for writing clean and maintainable CSS?', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'I suggest using a CSS preprocessor like SASS and following the BEM methodology.', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'How do you handle state management in a large React application?', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'We use Redux for state management, combined with the React-Redux library for seamless integration.', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'What are the benefits of using GraphQL over REST APIs?', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'GraphQL allows you to request exactly the data you need, reduces over-fetching, and provides a strongly-typed schema.', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Has anyone tried the new features in ES2021?', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Yes, the new logical assignment operators and numeric separators are very handy.', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'What is the best way to optimize performance in a React application?', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Use React.memo and the useMemo hook to prevent unnecessary re-renders, and consider code splitting with React.lazy.', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Can someone explain how to implement authentication in a Node.js application?', ${user2Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'I recommend using Passport.js for authentication. It has a wide range of strategies and is easy to integrate.', ${user3Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'What are some common security practices to follow when building a web application?', ${user1Id}, ${textChannelId}, ${now}, ${now}),
        (${newId(
          "message"
        )}, 'Always sanitize user inputs, use HTTPS, and implement proper error handling and logging.', ${user2Id}, ${textChannelId}, ${now}, ${now})
      `;

      // Inserir membros da guilda
      await sql`
        INSERT INTO guild_members (guild_id, user_id) VALUES
        (${guildId}, ${user1Id}),
        (${guildId}, ${user2Id}),
        (${guildId}, ${user3Id})
      `;
    })
    .then(() => {
      console.log("Database seeded");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit(0);
    });
}

seed();
