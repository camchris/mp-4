"use client"

import useSWR from "swr";
import WeatherCard from "@/components/weatherCard";
import styled from "styled-components";
import {Weather} from "@/app/interfaces/weather";
import { useParams } from "next/navigation";

const WeatherContentWrapper = styled.main`
    width: 80vw;
    margin: auto;
    font-family: sans-serif;
`;

const CityName = styled.h1`
    color: blueviolet;
`;

const WeatherCardsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    border: black 5px dashed;
`;


export default function CityPage() {
    const params = useParams();

    const {data, error} = useSWR(`/api/getWeatherData?city=${params.city}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const days = data?.days || [];

    return (
        <WeatherContentWrapper>
            <CityName>{params.city}</CityName>
            <WeatherCardsContainer>
                {
                    days.map((weather: Weather, i: number) =>
                        (
                            <WeatherCard key={i} datetime={weather.datetime} conditions={weather.conditions} description={weather.description} tempmin={weather.tempmin} tempmax={weather.tempmax} />
                        )
                    )
                }
            </WeatherCardsContainer>
        </WeatherContentWrapper>
    )
}