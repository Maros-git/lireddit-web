import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import router from 'next/router';

interface EditDeletePostButtonsProps {
    id: number,
    creatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
    id,
    creatorId
}) => {
    const [{ data: meData }] = useMeQuery()
    const [,deletePost] = useDeletePostMutation();
    
    if(meData?.me?.id !== creatorId) {
        return null
    }

    return (
        <Box  ml='auto'>
                    <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                        <IconButton 
                        mr={2}
                        aria-label='edit post' 
                        icon={<EditIcon color="tan"/>}
                        />
                        </NextLink>
                        <IconButton 
                        aria-label='delete post' 
                        icon={<DeleteIcon color="tan"/>}
                        onClick={() => {
                            deletePost({ id });
                            router.push('/')
                        }}
                        />
                </Box>
    );
}