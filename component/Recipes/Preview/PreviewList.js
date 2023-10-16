import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NumToTime from '@/component/handlerTime/timeRead';
import style from './previewList.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
//   textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow:'none',
  borderBottom: 'solid black 2px',
  borderRight: 'solid black 2px',
  cursor: 'pointer'
}));

export default function PreviewList({recipes, click}) {

    const router = useRouter()
    const currentPath = router.query.preview
    
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>

                    {
                        recipes && recipes.map((recipe) => {
                            return(
                                <Grid xs={12} md={12} key={recipe.id} className={style.item}>
                                    <Item key={recipe.id} >
                                        <Link href={`/${currentPath}/${recipe.title}`} className={style.link}>
                                            <h2 className={style.title}>{recipe.title}</h2>
                                            <div className={style.recipe}>
                                                
                                                <div>
                                                    <Image src={recipe.images[0]} className={style.img} alt={recipe.images[0]} width={200} height={100}/>
                                                </div>

                                                <div>
                                                    <p>{recipe.description.substring(0, 170)}</p>                               
                                                    <div className={style.times}> 
                                                        {/* adding time to display on preview */}
                                                        <div>
                                                            ⏲️ Prep: {NumToTime(recipe.prep)}
                                                            
                                                        </div>
                                                        <div>
                                                            🕰️ Cook: {NumToTime (recipe.cook)}
                                                            
                                                        </div>

                                                        {/* here is the total time for (added prep and cook) */}
                                                        <div>
                                                            ⏰ Total Time: {NumToTime(recipe.prep + recipe.cook)}
                                                            
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className={style.tagsList}>{recipe.tags.map((tag) => <h4 key={tag}> {`${tag}`}</h4>)}</div>
                                        </Link>
                                    </Item>

                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>

        <button onClick={click} >Load More </button>
        </>
    );
}