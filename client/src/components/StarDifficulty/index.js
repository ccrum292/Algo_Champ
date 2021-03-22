import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));


export default function StarDifficulty ({ numberOfStars }) {
  const classes = useStyles();
  
  const stars = () => {
    switch (numberOfStars) {
      case 1:
        return (
          <MenuItem>
            <StarIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </MenuItem>
        )
      
      case 2:
        return (
          <MenuItem>
            <StarIcon />
            <StarIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </MenuItem>
        )

      case 3:
        return (
          <MenuItem>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </MenuItem>
        )
      
      case 4:
        return (
          <MenuItem>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarBorderIcon />
          </MenuItem>
        )

      case 5:
        return (
          <MenuItem>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </MenuItem>
        )
          
      default: 
        return (
          <MenuItem>
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </MenuItem>
        )
    }
  }


  return stars();
}