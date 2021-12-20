import style from './Button.module.css'
import {memo} from "react";
import PropTypes from "prop-types"; 

const Button = ({onLoadMore}) => {
    return (
        <button type='button' onClick={onLoadMore} className={style.button}>Load More</button>
    )
}

export default memo(Button);

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}