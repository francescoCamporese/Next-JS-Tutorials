export async function getServerSideProps({ params }) {
    const res = await fetch("https://api.npoint.io/40b6a9afdc44474ad3ff");
    const people = await res.json();
    const person = people.filter(p => p.id === params.id);

    return {
        props: {
            person: person[0]
        }
    };
}

/*
export async function getStaticProps({ params }) {
    const res = await fetch("https://api.npoint.io/40b6a9afdc44474ad3ff");
    const people = await res.json();
    const person = people.filter(p => p.id === params.id);

    return {
        props: {
            person: person[0]
        }
    };
}

export async function getStaticPaths() {
    const res = await fetch("https://api.npoint.io/40b6a9afdc44474ad3ff");
    const people = await res.json();
    const paths = people.map(person => ({ params: { id: person.id } }));

    return {
        paths, fallback: false
    };
}
*/

export default function Person({ person }) {

    return (
        <>
            <h1>Person ID: {person.id}</h1>
            <h2>{person.name}</h2>
        </>
    );
}