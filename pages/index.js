import Head from "next/head";
import Image from "next/image";
import HomePage from "../components/organisms/home";
import styles from "../styles/Home.module.scss";

export default function Home(props) {
    return (
        <div>
            <HomePage {...props} />
        </div>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
