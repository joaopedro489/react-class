import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 1fr = 1 fraction
  gap: 2rem; // 2rem = 32px
  margin-top: -10rem; // 10rem = 160px

  div {
    background-color: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem; // 4px
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }
    &.highlight-background {
      background-color: var(--green);
      color: #fff;
    }
  }
`
