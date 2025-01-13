import { forwardRef } from 'react';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = forwardRef(({ onClick }, ref) => (
  <div className={css.buttonContainer}>
  <button ref={ref} className={css.loadMoreBtn} type="button" onClick={onClick}>
    Load more
  </button>
  </div>
));

LoadMoreBtn.displayName = 'LoadMoreBtn';

export default LoadMoreBtn;
