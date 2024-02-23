import Link from "next/link";

export async function getStaticProps() {
    const res = await fetch("https://api.npoint.io/40b6a9afdc44474ad3ff");
    const people = await res.json();

    return {
        props: {
            people
        }
    };
}

export default function AllPeople({ people }) {
    return (
        <>
            <h1>All People</h1>
            <ul>
                {
                    people.map(person => (
                        <li key={person.id}><Link href={"/people/" + person.id}>{person.name}</Link></li>
                    ))
                }
            </ul>
        </>
    );
}