Here’s the final copy-paste-ready `README.md` file for your Angular Task Manager App:

---

```markdown
# 🧑‍💻 Angular Task Manager App

A modern Task Manager built using **Angular Standalone Components**, **SCSS**, and **JSON Server** as a mock backend.

---

## 🚀 Features

- ✅ Login, Signup, Logout with localStorage session
- ✅ Auth Guard protected dashboard
- ✅ View Task List (GET)
- ✅ Add Task (POST) in modal
- ✅ Edit Task (PUT) in modal
- ✅ Delete Task (DELETE)
- ✅ Loading spinners
- ✅ Responsive UI with modern SCSS
- ✅ Fake backend via JSON Server

---

## 🛠️ Tech Stack

- Angular 17+ (Standalone)
- Angular Material Dialog
- Reactive Forms
- SCSS for styling
- JSON Server for REST API simulation

---

## 📁 Folder Structure

```

src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── tasks/
│   │   ├── task-form/
│   │   ├── task-list/
│   │   └── task-update/
│   ├── core/
│   │   └── guards/
│   ├── shared/
│   │   └── models/
│   └── app.routes.ts

````

---

## 📦 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/task-manager-angular.git
cd task-manager-angular
npm install
````

### 2. Run JSON Server

```bash
npx json-server --watch db.json --port 3000
```

> Your `db.json` should look like:

```json
{
  "users": [],
  "tasks": []
}
```

### 3. Start Angular App

```bash
npm run dev       # if using Vite
# or
ng serve          # if using Angular CLI
```

---

## 🔐 Routes

| Path         | Description         |
| ------------ | ------------------- |
| `/login`     | Login page          |
| `/signup`    | Signup page         |
| `/dashboard` | Protected dashboard |

---

## 🔒 Auth Logic

* On login/signup:

  * Sets `loggedIn` and `user` in localStorage
* Auth Guard checks these to protect `/dashboard`
* Logout clears localStorage and redirects to login

---

## 📝 Notes

* Tasks are managed via `http://localhost:3000/tasks`
* Users are stored in `http://localhost:3000/users`
* Ideal for learning full Angular CRUD + Auth with fake API

---

## 📄 License

MIT — Made with ❤️ by [Amit Dudhankar](https://github.com/amitdudhankar)

```

---

✅ You can now paste this into your `README.md` file and commit it to GitHub. Let me know if you want badges, screenshots, or deployment steps added!
```
