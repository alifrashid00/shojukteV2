let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);


// const commentInputt = document.querySelector('#commentt');

// // Maximum number of characters per line (adjust based on your design)
// const maxCharsPerLine = 50;

// // Automatically add newline when text exceeds maxCharsPerLine
// commentInputt.addEventListener('input', () => {
//     let value = commentInputt.value;
//     let lines = value.split('\n');
//     let newValue = '';

//     lines.forEach(line => {
//         while (line.length > maxCharsPerLine) {
//             newValue += line.substring(0, maxCharsPerLine) + '\n';
//             line = line.substring(maxCharsPerLine);
//         }
//         newValue += line + '\n';
//     });

//     // Remove the last extra newline
//     newValue = newValue.trimEnd();

//     // Update the textarea only if the value has changed
//     if (commentInputt.value !== newValue) {
//         commentInputt.value = newValue;
//     }
// });


docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const eventDate = document.querySelector('.eventDate');
    const commentSection = document.querySelector('.comment-section');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    eventDate.innerHTML += data.theDate;
    eventDate.innerHTML += ' ';
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    eventDate.innerHTML += months[data.theMonth];
    eventDate.innerHTML += ' ';
    eventDate.innerHTML += data.theYear;

    const article = document.querySelector('.article');
    addArticle(article, data.article);

    if (data.comments) {
        commentSection.value = data.comments.map(comment => '>>> ' + comment).join('\n\n') + '\n\n';
        // data.comments.forEach(comment => {
        //     const p = document.createElement('p');
        //     p.textContent = 'anonymous: '+comment+'\n\n';
        //     commentSection.appendChild(p);
        // });
    }
    
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

const commentBtn = document.querySelector('.publish-btn');
    const commentInput = document.querySelector('.comment');

    commentBtn.addEventListener('click', () => {
        const newComment = commentInput.value.trim();
        if (newComment) {
            addComment(newComment);
        }
    });

    const addComment = (newComment) => {
        let docRef = db.collection("blogs").doc(blogId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                let comments = data.comments || [];
                comments.push(newComment);

                docRef.update({
                    comments: comments
                }).then(() => {
                    const commentSection = document.querySelector('.comment-section');
                    // const p = document.createElement('p');
                    // p.textContent = 'anonymous: '+newComment+'\n\n';
                    // commentSection.appendChild(p);
                    commentSection.value += '>>> ' + newComment + '\n\n';
                    commentInput.value = ''; // Clear the input field
                }).catch((err) => {
                    console.error('Error updating document:', err);
                });
            } else {
                console.error('Document does not exist!');
            }
        }).catch((err) => {
            console.error('Error getting document:', err);
        });
    };
