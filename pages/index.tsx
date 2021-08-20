import React, { useEffect } from "react";
import HomePage from "../components/organisms/home";

import { HomePageProps } from "components/organisms/home/interfaces";
import { getPlans, getRecipes } from "@helpers";
import { Benefit, HowItWorks } from "components/organisms/sections/interfaces";

export default function Home(props: HomePageProps) {
    return (
        <div>
            <HomePage {...props} />
        </div>
    );
}

export async function getServerSideProps({ locale }) {
    const [_plans, _recipes] = await Promise.all([getPlans(locale), getRecipes(locale)]);

    const errors = [_plans.error, _recipes.error].filter((e) => !!e);

    if (errors.length) {
        console.warn("***-> Errors: ", errors);
    }

    return {
        props: {
            plans: _plans.data.plans || [],
            recipes: _recipes.data || [],
            howItWorks,
            benefits,
            errors,
        },
    };
}

const howItWorks: HowItWorks[] = [
    {
        title: "Apúntate",
        content: "Elige el plan que más se adapte a ti. Escoge la cantidad de días y raciones por día que quieres que te llevemos cada semana. ¡No te aburrirás, tenemos muchas recetas!",
        image: "/assets/home/home-cf1-apuntate.webp",
    },
    {
        title: "Recibe",
        content: "Cada martes recibirás con ilusión tus kits personalizados con los ingredientes frescos necesarios y exactos para preparar las recetas que has elegido.",
        image: "/assets/home/home-cf2-recibe.webp",
    },
    {
        title: "Cocina",
        content: "Saca el chef que llevas dentro y tómate la calma para cocinar. Cuentas con la ayuda de nuestras recetas y videorecetas. ¡Son muy fáciles de preparar!",
        image: "/assets/home/home-cf3-cocina.webp",
    },
    {
        title: "Disfruta",
        content: "¡A cenaaaaar! Disfruta de una cena deliciosa y diferente. El mejor premio para un día ajetreado, un manjar rico y saludable hecho para ti… ¡y por ti!",
        image: "/assets/home/home-cf4-disfruta.webp",
    },
];

const benefits: Benefit[] = [
    {
        title: "Economiza tu tiempo",
        content: "Sabemos que no está en nuestras manos parar el ritmo de la sociedad en la que vivimos, pero si aportar una solución con la que podamos sacar momentos para cuidarnos día a día.",
        image: "/assets/home/save-time.svg",
    },
    {
        title: "Come saludable y variado",
        content: "Queremos cuidarte en todo sentido, por eso seleccionamos para tus cenas, ingredientes frescos y de proximidad y te sorprendemos cada semana con recetas variadas.",
        image: "/assets/home/healthy-food.svg",
    },
    {
        title: "Combate el foodwaste",
        content: "¡La comida no se tira! En Let’s Cook seleccionamos la cantidad de ingredientes exacta para que no queden excedentes, pero somos generosos con la ración para los más hambrientos.",
        image: "/assets/home/foodwaste.svg",
    }
];
