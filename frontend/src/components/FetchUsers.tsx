import { useUsers } from "../hooks/useUsers";

export function FetchUsers() {
  const { users, error, loading, loadUsers } = useUsers();
  return (
    <>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading &&
          users.map((e) => (
            <div key={e.id}>
              ID: {e.id} <br />
              Name: {e.name} <br />
              Email: {e.email} <br />
              CreatedAt: {e.createdAt} <br />
              Tokens: {e._count.refreshTokens} <br />
            </div>
          ))}
        <button
          onClick={() => {
            loadUsers();
          }}
        >
          Refresh
        </button>
      </div>
    </>
  );
}
