import NavBar from "./components/layout/NavBar";
export default function Home() {
  return (
    <>
      <NavBar />
    </>
  );
}


/*
- navbar: - name logo left, links (Home, About Me  in middle,  -> Social links(github, linkedin, twitter)) on right
- body with blogs: - title
                   - posted by, date, under which category
                   - blog content
                   - read more button(Continue reading this post...), comments [num] if any!
 - << newer posts, older posts >>
 - footer: - copyright, Questions? Contact me at: email, social links(github, linkedin, twitter)
**/