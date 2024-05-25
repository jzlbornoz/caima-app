

const TimeStampsToDate = (seconds: number) => {
    const date = new Date(seconds * 1000)
    return date
}

export { TimeStampsToDate }