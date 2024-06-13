import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useFocusEffect,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePokemonContext } from "./ContextProvider";
import { deletePokemonById, getCatchedPokemons } from "@/pages/api/gateways";

export default function Catched() {
  const [pokemonSelected, setPokemonSelected] = useState(null);
  const { myPokemons, setExecuteDelete } = usePokemonContext();
  const handleDelete = () => {
    if (pokemonSelected) {
      deletePokemonById(pokemonSelected.id);
      setPokemonSelected(null);
      setExecuteDelete(true);
    }
  };
  return (
    <Flex
      spacing={4}
      align="end"
      w={"10%"}
      position={"fixed"}
      direction={"column"}
      right={5}
      top={10}
      zIndex={100}
    >
      <Text fontSize={{ base: "lg", md: "2xl" }}>
        {myPokemons.length > 0 && "Capturados: "}
      </Text>
      <Wrap spacing={{ base: 2, md: -4 }} align="center">
        {myPokemons.map((pokemon, index) => (
          <WrapItem key={pokemon.name}>
            <Box
              boxSize={{ base: "30px", md: "50px" }}
              borderRadius="full"
              zIndex={index}
              background={"white"}
              border="1px solid grey"
              ml={{ base: -3, md: -5 }}
              onClick={() => setPokemonSelected(pokemon)}
              cursor="pointer"
              position="relative"
            >
              <Image src={pokemon.source} alt={pokemon.name} />
            </Box>
          </WrapItem>
        ))}
        {pokemonSelected && (
          <WrapItem>
            <Button onClick={handleDelete} colorScheme="red">
              X
            </Button>
          </WrapItem>
        )}
      </Wrap>
    </Flex>
  );
}
