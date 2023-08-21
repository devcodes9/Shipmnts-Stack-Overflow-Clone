const Question = require("../models/Question");

const searchQuestions = async (req, res) => {
  try {
    let { query, tag, order } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Please enter search query",
      });
    }

    let sortOptions = {};

    if (!tag && !order) {
      sortOptions = { votes: -1 };
    } else {
      if (tag == "time") {
        tag = "createdAt";
      } else if (tag == "vote") {
        tag = "votes";
      } else {
        return res.status(400).json({
          success: false,
          message: "Please enter valid tag",
        });
      }
      if (order === "asc") {
        sortOptions = { [tag]: 1 };
      } else if (order === "desc") {
        sortOptions = { [tag]: -1 };
      } else {
        return res.status(400).json({
          success: false,
          message: "Please enter valid order",
        });
      }
    }

    const searchResults = await Question.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort(sortOptions);

    // const searchResultsFromAnswer = await searchAnswers(query);

    // const results = searchResults.concat(searchResultsFromAnswer.data);

    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: searchResults,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// this returns questions which contain the searched query
// const searchAnswers = async (query) => {
//   try {
//     console.log(query)
//     const searchResults = await Answer.find({
//       text: { $regex: query, $options: "i" },
//     }).populate("question")
//     .exec();
//     console.log(searchResults)
//     const questionsFromAnswers = searchResults.map(answer => answer.question);
//     console.log("Fromans", questionsFromAnswers)
//     return {
//       success: true,
//       message: "Search results fetched successfully",
//       data: questionsFromAnswers
//     }
//   } catch (err) {
//     return {
//       success: false,
//       message: err.message,
//     };
//   }
// };

module.exports = { searchQuestions };
