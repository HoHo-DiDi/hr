"use client";

import { MultiSelect } from "@/components/form/MultiSelectField";
import { useState } from "react";

const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
];

export default function Welcome() {
    // This state holds an array of the selected values (e.g., ["react", "vue"])
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

    return (
        <div className="p-8 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Favorite Frameworks</h2>

            <MultiSelect
                options={frameworks}
                selected={selectedFrameworks}
                onChange={setSelectedFrameworks}
                placeholder="Select frameworks..."
            />

            <div className="mt-4 text-sm text-gray-500">
                Selected data: {JSON.stringify(selectedFrameworks)}
            </div>
        </div>
    );
}