import { useState } from "react";
import { Group, Affix, Title } from "@mantine/core";
import {
  IconGauge,
  IconMoodHappy,
  IconNotebook,
  IconBooks,
  IconArticle,
  IconBrandDenodo,
  IconLogout,
  IconPhoneCall,
} from "@tabler/icons-react";
import classes from "./nav.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserButton } from "../UserButton/UserButton";
import { useViewportSize } from "@mantine/hooks";
import "react-toastify/dist/ReactToastify.css";

const data = [
  { icon: IconGauge, label: "Dashboard", link: "" },
  { icon: IconMoodHappy, label: "Mood Check", link: "/mood" },
  { icon: IconNotebook, label: "Journal Entry", link: "/journal" },
  { icon: IconBooks, label: "Books", link: "/resources/books" },
  { icon: IconArticle, label: "Articles", link: "/resources/articles" },
  {
    icon: IconBrandDenodo,
    label: "Organizations",
    link: "/resources/organizations",
  },
  {
    icon: IconPhoneCall,
    label: "Helpline",
    link: "/resources/helpline",
  },
];

export default function Navigation() {
  const { height } = useViewportSize();
  const navigate = useNavigate();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(`/dashboard${item.link}`);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Affix position={{ top: 0, left: 0 }}>
      <nav className={classes.navbar} style={{ height: `${height}px` }}>
        <div className={classes.navbarMain}>
          <Group className={classes.header}>
            <Title order={1} c="#EDF2F4">
              MoodSpace
            </Title>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <UserButton />
          <Link to="/logout" className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
    </Affix>
  );
}
