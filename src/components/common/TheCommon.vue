<script>

export function formatDate (date) {
    try {
        let characters = "/"
        if (date) {
            date = new Date(date);
            return `${((date.getDate() < 10) ? '0' : '')}${date.getDate()}${characters}${((date.getMonth() < 10) ? '0' : '')}${date.getMonth() + 1}${characters}${date.getFullYear()}`
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}
</script>