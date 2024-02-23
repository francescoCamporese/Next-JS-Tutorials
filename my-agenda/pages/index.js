import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>MY BLOG | Home page</title>
                <meta name="description" content="Blog homepage" />
                <meta name="keywords" content="home,blog,cms,next" />
            </Head>
            <h1>Home</h1>
            <style jsx>{`
                h1{
                    color: darkgreen;
                }
            `}</style>
        </>
    );
}