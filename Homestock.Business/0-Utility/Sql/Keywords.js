; (function () {
    "use strict";

    var nsString = "Util.SQL";
    var ns = HomeStock.Import(nsString);

    ns.Export("Keywords", {
        create: "CREATE",
        drop: "DROP",
        table: "TABLE",
        select: "SELECT",
        insert: "INSERT INTO",
        update: "UPDATE",
        delete: "DELETE",
        from: "FROM",
        where: "WHERE",
        groupby: "GROUP BY",
        orderby: "ORDER BY",
        join: {
            inner: "INNER JOIN",
            left: "LEFT JOIN",
            right: "RIGHT JOIN"
        },
        limit: "LIMIT",
        offset: "OFFSET",
        on: "ON",
        set: "SET",
        values: "VALUES",
        if: "IF",
        not: "NOT",
        exists: "EXISTS"
    });
})();