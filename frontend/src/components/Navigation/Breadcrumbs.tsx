import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {fullData} from "../Carousels/carouselMock";

interface CollectionTitles {
    [key: string]: string;
}

interface BreadcrumbTitles {
    [key: string]: string;
}


export function CustomSeparator() {
    const location = useLocation();

    const breadcrumbTitles: BreadcrumbTitles = {
        '/': 'Головна',
        '/collections': 'Колекції',
        '/about': 'Про нас',
        '/contact': 'Контакти',
    };

    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        let currentPath = '';
        const breadcrumbs = [];

        const isHomePage = paths.length === 0;

        if (!isHomePage) {
            breadcrumbs.push(
                <Link
                    key="/"
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to="/"
                    sx={{marginLeft:'30px', fontSize:'18px'}}
                >
                    Головна
                </Link>
            );
        }

        paths.forEach((path) => {
            currentPath += '/' + path;

            const collectionTitles: CollectionTitles = fullData.collections.reduce((acc: CollectionTitles, collection) => {
                acc[collection.id] = collection.name;
                return acc;
            }, {});
            const collectionTitle: string = collectionTitles[path] || path;

            breadcrumbs.push(
                <Link
                    key={currentPath}
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to={currentPath}
                    sx={{fontSize:'18px'}}
                >
                    {breadcrumbTitles[currentPath] || collectionTitle}
                </Link>
            );
        });

        return breadcrumbs;
    };

    return (
        <div style={{ backgroundColor: '#E3E3E26E' }}>
            <Stack spacing={2}>
                {generateBreadcrumbs().length > 0 && (
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {generateBreadcrumbs()}
                    </Breadcrumbs>
                )}
            </Stack>
        </div>
    );
}
