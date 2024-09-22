import * as data from "../resources.json";
import { Table, Container, Title, Anchor } from "@mantine/core";
export default function Helpline() {
  const rows = data.helpline.map((number) => (
    <Table.Tr key={number.name}>
      <Table.Td>{number.name}</Table.Td>
      <Table.Td>
        <Anchor href={`tel:${number.no}`} underline="never">
          {number.no}
        </Anchor>
      </Table.Td>
      <Table.Td>{number.type}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Container p={20}>
      <Title mb={20}>Helpline Numbers</Title>
      <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Helpline Name/Organization</Table.Th>
            <Table.Th>Contact No.</Table.Th>
            <Table.Th>Type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}
