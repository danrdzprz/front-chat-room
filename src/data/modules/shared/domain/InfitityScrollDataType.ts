export type LoadType = 
{
    side: 'start' | 'end' | 'both'
    done: (status: 'error' | 'loading' | 'empty' | 'ok') => void
}