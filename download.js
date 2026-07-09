const fs = require('fs');
const https = require('https');
const path = require('path');

const publicBlogDir = path.join(__dirname, 'apps/frontend/public/blog');
const publicAuthorsDir = path.join(__dirname, 'apps/frontend/public/authors');

fs.mkdirSync(publicBlogDir, { recursive: true });
fs.mkdirSync(publicAuthorsDir, { recursive: true });

const MOCK_ARTICLES = [
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=marcus",
      filename: "marcus.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "react-server-components.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=elena",
      filename: "elena.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "premium-saas.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=sarah",
      filename: "sarah.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "core-web-vitals.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=alex",
      filename: "alex.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "llm-production.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=marcus", // duplicate author
      filename: "marcus.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "tailwind-v4.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=david",
      filename: "david.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "zero-trust.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=elena", // duplicate author
      filename: "elena.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "framer-motion.jpg"
  },
  {
    author: {
      avatar: "https://i.pravatar.cc/150?u=sarah", // duplicate author
      filename: "sarah.jpg"
    },
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    coverFilename: "accessibility.jpg"
  },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`Exists: ${dest}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
         https.get(response.headers.location, (res) => {
             res.pipe(file);
             file.on('finish', () => {
                 file.close();
                 resolve();
             });
         }).on('error', reject);
      } else {
         response.pipe(file);
         file.on('finish', () => {
             file.close();
             resolve();
         });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  for (const article of MOCK_ARTICLES) {
    const authorDest = path.join(publicAuthorsDir, article.author.filename);
    const coverDest = path.join(publicBlogDir, article.coverFilename);
    
    console.log(`Downloading ${article.author.filename}...`);
    await download(article.author.avatar, authorDest);
    
    console.log(`Downloading ${article.coverFilename}...`);
    await download(article.coverImage, coverDest);
  }
  console.log("Done downloading images.");
}

main().catch(console.error);
