"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const SantaIcon = () => (
    <svg className="w-24 h-24 mx-auto mb-5" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="#cc0000" />
        <circle cx="50" cy="35" r="15" fill="#ffe0d0" />
        <circle cx="45" cy="32" r="2" fill="black" />
        <circle cx="55" cy="32" r="2" fill="black" />
        <path d="M45 40 Q50 45 55 40" stroke="black" fill="none" strokeWidth="2" />
        <rect x="35" y="25" width="30" height="10" fill="#cc0000" />
        <circle cx="65" cy="25" r="5" fill="#ffffff" />
    </svg>
);

export const SantaLetterForm = () => {
    const [letter, setLetter] = useState("");
    const [error, setError] = useState("");
    const [santaResponse, setSantaResponse] = useState("");

    const { mutate: sendLetter, isLoading } = api.santa.sendLetter.useMutation({
        onSuccess: (response) => {
            setSantaResponse(response.santaResponse);
            console.log("Success response:", response);
        },
        onError: (err) => {
            setError("Oh no! There was a problem delivering your letter to the North Pole. Please try again!");
            console.error("Error sending letter:", err);
        },
    });

    const handleSubmit = () => {
        if (letter.trim() === "") {
            alert("Please write a letter first!");
            return;
        }
        setError("");
        sendLetter({ childLetterText: letter });
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/IMG_7015.jpg")' }}>
            <div className="max-w-3xl w-full">
                <h1 className="font-serif text-6xl mb-2 text-[#2C3639]">Letters to</h1>
                <h1 className="font-serif text-6xl mb-12 text-[#8B0000]">Santa Claus</h1>

                <div className="bg-transparent rounded-lg p-12 shadow-sm">
                    <textarea
                        value={letter}
                        onChange={(e) => setLetter(e.target.value)}
                        className="w-full min-h-[240px] p-6 bg-stone-50 rounded-lg text-lg font-serif 
                        placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#2C3639]
                        transition-all duration-300 resize-none"
                        placeholder="Dear Santa..."
                        disabled={isLoading}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="mt-6 bg-[#8B0000] hover:bg-[#660000] text-white px-8 py-3 
                        rounded-lg text-lg transition-all duration-300 disabled:opacity-50 
                        disabled:cursor-not-allowed font-light tracking-wide"
                    >
                        {isLoading ? "Sending..." : "Send Letter"}
                    </button>
                </div>

                {error && (
                    <div className="mt-8 p-6 rounded-lg bg-white text-[#8B0000] border border-[#8B0000]">
                        {error}
                    </div>
                )}

                {santaResponse && !error && (
                    <div className="mt-8 p-6 rounded-lg bg-white border border-[#2C3639]">
                        <p className="text-sm uppercase tracking-wider text-stone-500 mb-4">Santa's Response</p>
                        <p className="text-lg font-serif mb-6 whitespace-pre-line">{santaResponse}</p>
                        <p className="text-right font-serif text-[#8B0000]">— Santa Claus</p>
                    </div>
                )}
            </div>
        </div>
    );
};