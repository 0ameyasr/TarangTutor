function formatDOC(createdDate) {
    const dateObj = new Date(createdDate);
    if (!isNaN(dateObj.getTime())) {
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear().toString().slice(2);
        return `${day} ${month} ${year}`;
    }
    return createdDate;
  }

