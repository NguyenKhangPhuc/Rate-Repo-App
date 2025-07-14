import { screen, render, fireEvent } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepoList";
describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const data = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };
            const handleConvertNumber = (number) => {
                if (number > 1000) {
                    const newNumber = (number / 1000).toFixed(1)
                    return newNumber + 'k'
                }
                return number

            }
            const repositories = data.edges.map(e => e.node)
            render(<RepositoryListContainer repositories={repositories} />)
            const repoItems = screen.getAllByTestId('repositoryItem')
            expect(repoItems).toHaveLength(2)
            repositories.forEach((e) => {
                expect(screen.getByText(e.fullName)).toBeDefined()
                expect(screen.getByText(e.description)).toBeDefined()
                expect(screen.getByText(e.language)).toBeDefined()
                expect(screen.getByText(handleConvertNumber(e.forksCount).toString())).toBeDefined()
                expect(screen.getByText(handleConvertNumber(e.stargazersCount).toString())).toBeDefined()
                expect(screen.getByText(handleConvertNumber(e.ratingAverage).toString())).toBeDefined()
                expect(screen.getAllByText(handleConvertNumber(e.reviewCount).toString())).toHaveLength(2)
            })
        });
    });
});