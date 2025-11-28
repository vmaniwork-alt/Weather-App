import React, { useState } from "react";
import { WiDayCloudy, WiDaySunny } from "react-icons/wi";
import axios from "axios";
const Weather = () => {

    const [city, setcity] = useState("");
    const [weather, setweather] = useState("");
    const [temp, settemp] = useState("");
    const [desc, setdesc] = useState("")

    const handleChange = (e) => {
        setcity(e.target.value)

    }
    const Getweather = () => {
        const weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64c440e7a3e57e98d56279201b241f14`
        )
        weatherdata.then((success) => {
            setweather(success.data.weather[0].main)
            settemp(success.data.main.temp)
            setdesc(success.data.weather[0].description)

        }) .catch((error) => {
            console.log("Error:", error);
            alert("City not found or network issue!");
        });

    }
    return (
        <>
            <div className="h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">

                <div className="flex justify-center items-center h-screen">

                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl 
            border border-white/30 transition-all duration-300
            hover:bg-gradient-to-br from-sky-500 via-purple-500 to-orange-500 /20 
            hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
            hover:-translate-y-1 hover:border-white/60">
                        <div className="flex items-center gap-2"> <h1 className="text-3xl font-bold items-center">  Weather Report </h1><WiDayCloudy className="
                text-6xl  text-orange-400" />
                        </div>
                        <p>I can give you a  weather report  about your city !</p>
                        <div className="flex flex-col w-52 gap-3 mt-3">
                            <input type="text" placeholder="Enter your city Name "
                                className="border  bg-transparent border-gray-400 p-1  rounded-md hover:bg-yellow-50 focus:bg-none"
                                onChange={handleChange}
                            ></input>

                            <button
                                className="bg-purple-500 text-white shadow-xl border border-white/30 py-2 w-24 p-1 
                            rounded-md transition-all duration-300
                            hover:-translate-y-1   
                          hover:bg-orange-500 hover:shadow-yellow-200
                          hover:border-white/60"
                                onClick={Getweather}
                            >Get Report</button>

                            <h2 className="font-semibold">Weather : {weather}</h2>
                            <h2 className="font-semibold">Tempeurature : {temp}</h2>
                            <h2 className="font-semibold">Description : {desc}</h2>
                        </div>




                    </div>

                </div>

            </div>
        </>
    )
};
export default Weather;