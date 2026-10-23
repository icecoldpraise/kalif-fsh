# Kalif-FSH: Git database + Vercel

Your data lives as files in this repo (`data/products.json`, `data/reviews.json`, photos in `img/`). Every admin change is a Git commit, and Vercel redeploys on each commit (about a minute).

1. Create a GitHub repo and push this folder to it.
2. GitHub > Settings > Developer settings > Fine-grained tokens: create a token for this repo only, with Contents: Read and write.
3. Vercel > Add New > Project > import the repo (Framework: Other, no build command).
4. Vercel > Settings > Environment Variables (then redeploy):
   - GITHUB_TOKEN = your token
   - GITHUB_REPO = yourname/your-repo
   - ADMIN_USER = your username
   - ADMIN_PASS = a strong password
5. Admin: open `your-site.vercel.app/#/admin` and log in.

Orders, bookings and quiz profiles go to WhatsApp (+234 814 319 6891). They are not stored.
