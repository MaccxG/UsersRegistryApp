function Text() {
    const caption = (
        "This is a small full stack web app, " +
        "based on React, Spring Boot and MySQL, " +
        "that implements the four CRUD operations " +
        "to manage a users registry."
    );

    return (
        <div className="card-text">
            {caption}
        </div>
    );
}

export default Text