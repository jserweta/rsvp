import {
  fetchGroupMembers,
  fetchGroupNeedAccommodation,
  fetchMenuKinds,
} from "@/lib/data";

type SearchParams = {
  groupId?: string;
};

type Person = { name: string; surname: string };

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { groupId } = await searchParams;

  if (!groupId) {
    return <p>Please provide a valid groupId in search parameters.</p>;
  }

  const [groupMembers, needAccommodation, menuKinds]: [
    PromiseSettledResult<Person[]>,
    PromiseSettledResult<boolean>,
    PromiseSettledResult<string[]>
  ] = await Promise.allSettled([
    fetchGroupMembers(groupId),
    fetchGroupNeedAccommodation(groupId),
    fetchMenuKinds(),
  ]);

  return (
    <main>
      <h1>Group Members: </h1>
      {groupMembers.status === "fulfilled" && groupMembers.value.length > 0 ? (
        <ul>
          {groupMembers.value.map((item, index) => (
            <li key={index}>
              {item.name} {item.surname}
            </li>
          ))}
        </ul>
      ) : (
        <p>No members found.</p>
      )}

      {menuKinds.status === "fulfilled" && menuKinds.value.length > 0 ? (
        <ul>
          {menuKinds.value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No menu Kinds found.</p>
      )}

      {needAccommodation && <p>Potrzebne zakwaterowanie!</p>}
    </main>
  );
}
