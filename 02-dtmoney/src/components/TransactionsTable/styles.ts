import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 4rem; // 64px
  table {
    width: 100%;
    border-spacing: 0 0.5rem; // 0.5rem = 8px

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem; // 16px 32px
      text-align: left;
      line-height: 1.5rem; // 24px
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem; // 4px

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }
  }
`
