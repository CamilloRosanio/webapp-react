// UTILITY
import { useState } from 'react';


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPathReviews = import.meta.env.VITE_APISUBPATH_REVIEWS;


// COMPONENT EXPORT

export default function ReviewsForm({ movie_id, hideForm, hideReviewForm, ajaxShow }) {

    // FORM FIELDS
    const [formValues, setFormValues] = useState({
        movie_id: '',
        name: '',
        vote: '',
        text: '',
        created_at: '',
        updated_at: '',
    })

    // DATE AND TIME FORMATTING
    function formatDateTime() {

        // DATE
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        // TIME
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // SET DATE AND TIME VALUES
    formValues.created_at = formatDateTime();
    formValues.updated_at = formatDateTime();


    // HANDLER VALUES CHANGE
    const handleValuesChange = (e) => {

        // TEXT VS CHECKBOX VALIDATION
        const receivedValue = (e.target.type === 'checkbox' ? e.target.checked : e.target.value);

        // SET PROPERTY VALUE
        setFormValues({
            ...formValues,
            [e.target.name]: receivedValue,
        });
    }

    // AJAX REQUEST - STORE 
    const ajaxStore = () => {
        fetch((apiUrlRoot + apiSubPathReviews + '/'), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
        })
            .then(res => res.json())
            .then((data) => {
                ajaxShow();
                console.log('AJAX STORE Review request at: ' + apiUrlRoot + apiSubPathReviews + '/');
            })
            .catch((error) => {
                console.log('Error while fetching content')
            })
    };

    // HANDLER FORM SUBMIT
    const handleSubmit = (e) => {

        // PREVENT DEFAULT PAGE RELOAD
        e.preventDefault();

        // PARSEINT PARAMS
        formValues.movie_id = parseInt(movie_id);
        formValues.vote = parseInt(formValues.vote);

        // CALL AJAX REQUEST - STORE
        ajaxStore()

        alert(
            'Movie ID: (' + movie_id + ') Type: ' + typeof (formValues.movie_id) +
            '\n Name: (' + formValues.name + ') Type: ' + typeof (formValues.name) +
            '\n Vote: (' + formValues.vote + ') Type: ' + typeof (formValues.vote) +
            '\n Text: (' + formValues.text + ') Type: ' + typeof (formValues.text) +
            '\n Created: (' + formValues.created_at + ') Type: ' + typeof (formValues.created_at) +
            '\n Updated: (' + formValues.updated_at + ') Type: ' + typeof (formValues.updated_at)
        );

        // RESET VALUES
        setFormValues({
            movie_id: '',
            name: '',
            vote: '',
            text: '',
            created_at: '',
            updated_at: '',
        });
    }


    return <>
        <form id='reviewForm' onSubmit={handleSubmit}>
            <div className={hideForm ? 'hidden' : 'reviewFormContainer'}>

                {/* FORM TITLE */}
                <h2>Leave a Review</h2>

                {/* INPUTS */}
                <div className='reviewFormInputsContainer'>

                    {/* NAME */}
                    <input type='text' name='name' value={formValues.name} placeholder='Your name' onChange={handleValuesChange} className='input' required />

                    {/* VOTE */}
                    <select name='vote' value={formValues.vote} onChange={handleValuesChange} className='input' required >
                        <option value='0'>Vote</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>

                    {/* TEXT */}
                    <input type='text' name='text' value={formValues.text} placeholder='Write review here' onChange={handleValuesChange} className='input flexGrow' required />
                </div>

                {/* FORM BUTTONS */}
                <div className='reviewFormButtonsContainer'>
                    <button className='button'>Publish review</button>
                    <button type='button' className='button secondary' onClick={hideReviewForm}>Close</button>
                </div>
            </div>
        </form>
    </>
}