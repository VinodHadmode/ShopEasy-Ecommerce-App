import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="mb-3 mx-auto text-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </>
    )
}

export default CategoryForm
