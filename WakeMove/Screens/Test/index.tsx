import React from "react";
import { Container } from "@/Components/Atomo/container";
import { SearchView } from "@/Components/molecula/SeacrhView";

interface TestProps {
    navigation: any
}

export const Test = ({ navigation }: TestProps) => {
    return (
        <Container>
            <SearchView
                page="Final"
                navigation={navigation}
            />
            <SearchView
                page="Final"
                navigation={navigation}
            />
        </Container>
    )
}