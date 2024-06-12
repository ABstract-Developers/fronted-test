import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { usePokemonContext } from "./ContextProvider";

export default function PokemonData({ pokemon }) {
  const { setCatched, setIsModalOff } = usePokemonContext();
  setIsModalOff(false);
  const handleCatchedPokemon = () => {
    setCatched({
      id: pokemon.id,
      name: pokemon.name,
      source: pokemon.sprites.front_default,
    });
  };
  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box
          position="absolute"
          right="0"
          zIndex="99"
          onChange={handleCatchedPokemon}
        >
          <Checkbox>Catched</Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text>{pokemon.weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text>{pokemon.height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>{pokemon.moves.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <HStack>
              {pokemon.types.map((item) => (
                <Badge key={pokemon.id}>{item.type.name}</Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        {pokemon.stats.map((item) => (
          <Stack key={item.stat.name}>
            <Text fontSize="xs">{item.stat.name}</Text>
            <Progress
              bg="gray.300"
              borderRadius="full"
              value={item.base_stat}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
