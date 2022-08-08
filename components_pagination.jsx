import { useEffect, useState } from "react";
import clsx from "clsx";

export default function BlogsWrapper({ blogPosts = [], headerItems = [] }) {
    const postPerPage = 1;

    const [blogs, setBlogs] = useState(blogPosts.slice(0, postPerPage));
    const [currentPage, setCurrentPage] = useState(0);

    const paginateNumbers = Array.from(
        { length: blogPosts.length },
        (_, i) => i + 1
    );

    // handler functions

    const renderedBlogs = (num) => {
        const sliceFrom = postPerPage * num;
        setBlogs(blogPosts.slice(sliceFrom, sliceFrom + postPerPage));
    };

    const handleGotoPage = (num) => {
        setCurrentPage(num);
        renderedBlogs(num);
    };

    const hanldeNextPreviousPage = (num) => {
        const newCurrentPage = currentPage + num;

        if (newCurrentPage >= 0 && newCurrentPage < blogPosts.length) {
            setCurrentPage(newCurrentPage);
            renderedBlogs(newCurrentPage);
        }
    };

    useEffect(() => {}, []);

    return (
        <>
            <div className="flex justify-center mx-auto my-5">
                <div className="flex border divide-x-2 border-neutral-200">
                    <button
                        className="px-3.5 py-2"
                        onClick={() => hanldeNextPreviousPage(-1)}
                    >
                        previous
                    </button>
                    {paginateNumbers.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={clsx(
                                    "px-3.5 py-2 transition",
                                    currentPage === index &&
                                        "bg-blue-700 text-white"
                                )}
                                onClick={() => handleGotoPage(index)}
                            >
                                {item}
                            </button>
                        );
                    })}
                    <button
                        className="px-3.5 py-2"
                        onClick={() => hanldeNextPreviousPage(1)}
                    >
                        next
                    </button>
                </div>
            </div>
        </>
    );
}
