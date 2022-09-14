import { gql, useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import router from 'next/router';
import { useRef, useState } from 'react';

const GetFilterList = gql`
  {
    typeList: pokemon_v2_type {
      name
    }
    generationList: pokemon_v2_generation {
      name
    }
  }
`;

type SelectedStateType = {
  type?: Record<string, string>;
  generation?: Record<string, string>;
};

function PokemonFilterContainer() {
  const { loading, error, data } = useQuery<{
    generationList: Array<{ name: string }>;
    typeList: Array<{ name: string }>;
  }>(GetFilterList);

  const [selected, setSelected] = useState<SelectedStateType>({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const handleSelected = (type: 'type' | 'generation', data: string) => {
    if (selected[type]?.[data]) {
      setSelected((v) => {
        const copy = { ...v };
        delete copy[type]?.[data];
        return copy;
      });
    } else {
      setSelected((v) => ({ ...v, [type]: { ...v[type], [data]: data } }));
    }
  };

  const handleFilter = () => {
    router.replace({
      href: '/',
      query: {
        type: selected.type ? Object.keys(selected.type) : [],
        generation: selected.generation ? Object.keys(selected.generation) : [],
      },
    });
    onClose();
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} leftIcon={<AddIcon />}>
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Pokemon</DrawerHeader>

          <DrawerBody>
            <Heading size="md">Type</Heading>
            <Wrap alignItems="flex-start" my="4">
              {data?.typeList.map((type) => (
                <WrapItem key={type.name}>
                  <Badge
                    onClick={() => handleSelected('type', type.name)}
                    borderRadius={'lg'}
                    p="1"
                    variant={selected.type?.[type.name] ? 'solid' : 'subtle'}
                    colorScheme="facebook"
                  >
                    {type.name}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
            <Heading size="md">Generation</Heading>
            <Wrap alignItems="flex-start" my="4">
              {data?.generationList.map((generation) => (
                <WrapItem key={generation.name}>
                  <Badge
                    onClick={() =>
                      handleSelected('generation', generation.name)
                    }
                    borderRadius={'lg'}
                    p="1"
                    variant={
                      selected.generation?.[generation.name]
                        ? 'solid'
                        : 'subtle'
                    }
                    colorScheme="facebook"
                    key={generation.name}
                  >
                    {generation.name}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleFilter} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { PokemonFilterContainer };
