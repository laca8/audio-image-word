
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigator = useNavigate()
    return (
        <div className='flex flex-wrap gap-2 mt-10'>
            <Button onClick={() => navigator('/')}>Audio</Button>
            <Button onClick={() => navigator('/image')}>Image</Button>
            <Button onClick={() => navigator('/word')}>Word</Button>
        </div>
    )
}

export default Header