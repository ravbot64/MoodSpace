import Navigation from "../components/Navigation/Navigation";
import { Container, Grid } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";

const Dashboard = () => {
  const { height } = useViewportSize();
  return (
    <Container fluid p={0} h={height}>
      <Grid columns={24}>
        <Grid.Col span={4} >
          <Navigation />
        </Grid.Col>
        <Grid.Col span={20} h={height}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
