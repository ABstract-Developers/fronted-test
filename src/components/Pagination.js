'use-client'
import { Button, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { usePokemonContext } from './ContextProvider'

export const Pagination = ({numOfPages}) => {
    const [pagesToShow, setPagesToShow] = useState({ start: 0, end: 10});
    const {params, setParams} = usePokemonContext();
    const arrayPages = [];
    for (let i = pagesToShow.start; i < pagesToShow.end; i++) {
        arrayPages.push(i+1);
    }
    const handleMinus = () => {
        setPagesToShow({
            start: pagesToShow.start - 10 < 0 ? 0 : pagesToShow.start - 10, 
            end: pagesToShow.end - 10 < 10? 10 : pagesToShow.end - 10
        });
    }
    const handlePlus = () => {
        setPagesToShow({
            start: pagesToShow.start + 10 > numOfPages - 10? numOfPages - 10 : pagesToShow.start + 10, 
            end: pagesToShow.end + 10 > numOfPages? numOfPages : pagesToShow.end + 10
        });
    }
    return (
    <HStack spacing={2}>
        <Button
            onClick={handleMinus}
            variant={'solid' }
            colorScheme={'gray'}
        >
            MENOS
        </Button>
        {arrayPages.map((item, index) => (
            <Button
                key={index}
                onClick={() => setParams({...params, offset: index * params.chunk})}
                variant={'solid' }
                colorScheme={'gray'}
            >
                {item}
            </Button>
        ))}
        <Button
            onClick={handlePlus}
            variant={'solid' }
            colorScheme={'gray'}
        >
            MAS
        </Button>
    </HStack>
  )
}
