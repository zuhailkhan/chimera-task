import PostBox from "./PostBox";
import { screen, render, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'qui est esse',
                    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut re'
                }
            ])
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PostBox', () => {
    it('should show loading when loading', async () => {
        render(<PostBox />);

        const loadingEl = await screen.findByText(/Loading.../i)

        expect(loadingEl).toBeInTheDocument()
    })

    it('should show no posts when no posts', async () => {
        server.use(rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]))
        }))

        render(<PostBox />);

        const postContainer = await screen.findByText(/No Data/i);

        expect(postContainer).toBeInTheDocument();
        expect(screen.queryByTitle('contentRoot')).toBeNull()
    })

    it('should render a post', async () => {
      render(<PostBox />);
    
      const postContainer = await screen.findByTitle('contentRoot');
    
      await waitFor(() => {
        expect(postContainer.childNodes.length).toBeGreaterThanOrEqual(1);
        expect(postContainer).toBeInTheDocument();
      });
    });

    it('should throw an error if failed to fetch', async () => {
      server.use(
        rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      );

      render(<PostBox />);
    
        await waitFor(() => {
            const errorEl = screen.queryByText(/Error/i)
            expect(errorEl).toBeInTheDocument()
        })
    })
    
})
