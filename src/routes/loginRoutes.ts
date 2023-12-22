import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

// SECTION:
router.get("/login", (req: Request, res: Response) => {
  res.send(`
  <form method="POST">
     <div>
       <label>Email<label>
       <input name="email" />
     </div>

     <div>
       <label>Password<label>
       <input name="password" type="password" />
     </div>

     <button>Login</button>
  </form>
  `);
});

// SECTION:
router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@hi.com" && password === "pass1234") {
    // 1) Mark this person as logged in
    req.session = { loggedIn: true };

    // 2) Redirect to root route
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

// SECTION:
router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
         <div>
           <div>You are logged in</div>
           <a href="/logout">Log out</a>
         </div>
      `);
  } else {
    res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/login">Log in</a>
        </div>
     `);
  }
});

// SECTION:
router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

export { router };
